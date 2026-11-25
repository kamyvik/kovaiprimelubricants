from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import sys
import os
import json
import time
import urllib.parse
import re
import secrets
import hashlib
import http.cookies
import html
from datetime import datetime

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
USERS_FILE = os.path.join(DATA_DIR, 'users.json')
SESSIONS_FILE = os.path.join(DATA_DIR, 'sessions.json')
ENQUIRIES_FILE = os.path.join(DATA_DIR, 'enquiries.json')
PRODUCTS_FILE = os.path.join(DATA_DIR, 'products.json')
CATEGORIES_FILE = os.path.join(DATA_DIR, 'categories.json')
GALLERY_FILE = os.path.join(DATA_DIR, 'gallery.json')
SMTP_FILE = os.path.join(DATA_DIR, 'smtp_config.json')
OUTBOX_LOG = os.path.join(DATA_DIR, 'email_outbox.log')

# Security: Rate Limiting Stores
LOGIN_ATTEMPTS = {}    # ip -> list of timestamps
ENQUIRY_ATTEMPTS = {}  # ip -> list of timestamps

def check_login_rate_limit(client_ip):
    now = time.time()
    attempts = LOGIN_ATTEMPTS.get(client_ip, [])
    attempts = [t for t in attempts if now - t < 300]
    LOGIN_ATTEMPTS[client_ip] = attempts
    return len(attempts) < 5

def record_failed_login(client_ip):
    now = time.time()
    attempts = LOGIN_ATTEMPTS.get(client_ip, [])
    attempts.append(now)
    LOGIN_ATTEMPTS[client_ip] = attempts

def clear_login_attempts(client_ip):
    if client_ip in LOGIN_ATTEMPTS:
        del LOGIN_ATTEMPTS[client_ip]

def check_enquiry_rate_limit(client_ip):
    now = time.time()
    attempts = ENQUIRY_ATTEMPTS.get(client_ip, [])
    attempts = [t for t in attempts if now - t < 600]
    ENQUIRY_ATTEMPTS[client_ip] = attempts
    if len(attempts) >= 15:
        return False
    attempts.append(now)
    return True

# Security: Timing-Safe Password Verification Supporting Salted PBKDF2 & SHA256
def verify_password(stored_hash, input_password):
    if not stored_hash or not input_password:
        return False
    if stored_hash.startswith('pbkdf2_sha256$'):
        parts = stored_hash.split('$')
        if len(parts) == 4:
            iterations = int(parts[1])
            salt = parts[2].encode('utf-8')
            expected_hash = parts[3]
            calculated = hashlib.pbkdf2_hmac('sha256', input_password.encode('utf-8'), salt, iterations).hex()
            return secrets.compare_digest(calculated, expected_hash)
    # Legacy SHA-256 fallback with timing-safe comparison
    calculated = hashlib.sha256(input_password.encode('utf-8')).hexdigest()
    return secrets.compare_digest(calculated, stored_hash)

def hash_password_pbkdf2(password, salt=None):
    if not salt:
        salt = secrets.token_hex(16)
    iterations = 100000
    h = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), iterations).hex()
    return f"pbkdf2_sha256${iterations}${salt}${h}"

def format_lead_notification(r):
    msg_text = (
        f"NEW ONLINE ENQUIRY - KOVAI PRIME LUBRICANTS\n"
        f"----------------------------------------\n"
        f"Ref ID: {r.get('id')}\n"
        f"Customer: {r.get('name')}\n"
        f"Company: {r.get('company')}\n"
        f"Phone: {r.get('phone')}\n"
        f"WhatsApp: {r.get('whatsapp')}\n"
        f"Email: {r.get('email')}\n"
        f"Product: {r.get('product')}\n"
        f"Quantity: {r.get('quantity')}\n"
        f"Location: {r.get('location')}\n"
        f"Requirement: {r.get('message')}\n"
        f"----------------------------------------\n"
        f"Time: {r.get('date')}"
    )
    encoded = urllib.parse.quote(msg_text.encode('utf-8'))
    return {
        "text": msg_text,
        "wa_karan": f"https://wa.me/919655155266?text={encoded}",
        "wa_founder": f"https://wa.me/916380019886?text={encoded}"
    }

def dispatch_email_notification(r):
    leads = format_lead_notification(r)
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    log_entry = (
        f"[{now_str}] TO: kovaiprimelubricants24@gmail.com | REF: {r.get('id')}\n"
        f"SUBJECT: New Quote Request #{r.get('id')} from {r.get('name')} ({r.get('company')})\n"
        f"BODY:\n{leads['text']}\n"
        f"STATUS: QUEUED / LOGGED\n"
        f"------------------------------------------------------------\n\n"
    )
    try:
        with open(OUTBOX_LOG, 'a', encoding='utf-8') as f:
            f.write(log_entry)
    except Exception as e:
        print(f"Error logging email outbox: {e}")

    if os.path.exists(SMTP_FILE):
        try:
            with open(SMTP_FILE, 'r', encoding='utf-8') as f:
                cfg = json.load(f)
            if cfg.get('enabled') and cfg.get('smtp_password'):
                import smtplib
                from email.mime.text import MIMEText
                from email.mime.multipart import MIMEMultipart

                msg = MIMEMultipart('alternative')
                msg['Subject'] = f"New Lead #{r.get('id')} from {r.get('name')} - Kovai Prime Lubricants"
                msg['From'] = cfg.get('from_email', 'kovaiprimelubricants24@gmail.com')
                msg['To'] = ", ".join(cfg.get('to_emails', ['kovaiprimelubricants24@gmail.com']))

                part1 = MIMEText(leads['text'], 'plain', 'utf-8')
                msg.attach(part1)

                server = smtplib.SMTP(cfg.get('smtp_server', 'smtp.gmail.com'), cfg.get('smtp_port', 587), timeout=8)
                server.starttls()
                server.login(cfg.get('smtp_user'), cfg.get('smtp_password'))
                server.sendmail(msg['From'], cfg.get('to_emails'), msg.as_string())
                server.quit()
        except Exception as e:
            print(f"SMTP dispatch note: {e}")

class HardenedHTTPRequestHandler(SimpleHTTPRequestHandler):
    def address_string(self):
        return self.client_address[0] if self.client_address else '127.0.0.1'

    def log_message(self, format, *args):
        pass

    def get_client_ip(self):
        xff = self.headers.get('X-Forwarded-For')
        if xff:
            return xff.split(',')[0].strip()
        return self.client_address[0] if self.client_address else '127.0.0.1'

    def end_headers(self):
        clean_path = self.path.split('?')[0].lower()
        static_exts = ('.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.ico', '.css', '.js', '.woff', '.woff2', '.ttf')
        if any(clean_path.endswith(ext) for ext in static_exts) and not clean_path.startswith('/api/'):
            self.send_header('Cache-Control', 'public, max-age=86400')
        else:
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')

        # Penetration Testing Compliance: HTTP Security Headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        self.send_header('Permissions-Policy', 'geolocation=(), camera=(), microphone=()')
        self.send_header('Content-Security-Policy', "default-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https: data:;")
        self.send_header('Server', 'KPL-Secure-Gateway/2.0')
        super().end_headers()

    # Security: Completely Disable Directory Browsing (CWE-548 Fix)
    def list_directory(self, path):
        self.send_response(403)
        self.send_header('Content-Type', 'text/plain; charset=utf-8')
        self.end_headers()
        self.wfile.write(b"403 Forbidden: Directory browsing is disabled for security reasons.")
        return None

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def get_session_token(self):
        cookie_header = self.headers.get('Cookie', '')
        if cookie_header:
            c = http.cookies.SimpleCookie()
            try:
                c.load(cookie_header)
                if 'kpl_session' in c:
                    return c['kpl_session'].value
            except Exception:
                pass

        auth_header = self.headers.get('Authorization', '')
        if auth_header.startswith('Bearer '):
            return auth_header[7:].strip()

        parsed = urllib.parse.urlparse(self.path)
        qs = urllib.parse.parse_qs(parsed.query)
        if 'token' in qs and qs['token']:
            return qs['token'][0]

        return None

    def validate_session(self, token):
        if not token:
            return False, None

        if not os.path.exists(SESSIONS_FILE):
            return False, None

        try:
            with open(SESSIONS_FILE, 'r', encoding='utf-8') as f:
                sessions = json.load(f)
        except Exception:
            sessions = []

        now = time.time()
        for s in sessions:
            if s.get('token') == token and s.get('expires_at', 0) > now:
                return True, s.get('user')

        return False, None

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        clean_path = parsed.path.strip('/')

        # 1. API: Master Data (Live Products, Categories, Gallery, Enquiries)
        if clean_path in ['api/data', 'api/data.php']:
            prods = []
            cats = []
            gal = []
            enqs = []
            if os.path.exists(PRODUCTS_FILE):
                try:
                    with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
                        prods = json.load(f)
                except Exception:
                    pass
            if os.path.exists(CATEGORIES_FILE):
                try:
                    with open(CATEGORIES_FILE, 'r', encoding='utf-8') as f:
                        cats = json.load(f)
                except Exception:
                    pass
            if os.path.exists(GALLERY_FILE):
                try:
                    with open(GALLERY_FILE, 'r', encoding='utf-8') as f:
                        gal = json.load(f)
                except Exception:
                    pass
            if os.path.exists(ENQUIRIES_FILE):
                try:
                    with open(ENQUIRIES_FILE, 'r', encoding='utf-8') as f:
                        enqs = json.load(f)
                except Exception:
                    pass

            resp = {
                "status": "success",
                "products": prods,
                "categories": cats,
                "gallery": gal,
                "enquiries": enqs
            }
            body = json.dumps(resp, ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        # 2. API: Products only
        if clean_path in ['api/products', 'api/products.php']:
            prods = []
            if os.path.exists(PRODUCTS_FILE):
                try:
                    with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
                        prods = json.load(f)
                except Exception:
                    pass
            body = json.dumps(prods, ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        # 3. Protect dashboard: require verified admin session
        if clean_path in ['dashboard.html', 'dashboard.php']:
            token = self.get_session_token()
            is_valid, _ = self.validate_session(token)
            if not is_valid:
                self.send_response(302)
                self.send_header('Location', '/login.html?redirect=dashboard.html')
                self.end_headers()
                return

        # 4. Strict Security: Block direct web access to sensitive folders and data files
        blocked_prefixes = ['data', 'data/', '/data/', 'includes', 'includes/', '__pycache__', '__pycache__/']
        blocked_exts = ['.json', '.lock', '.log', '.py', '.env', '.backup', '.bak', '.git', '.htaccess']
        if (clean_path in ['data', 'includes', '__pycache__'] or
            any(clean_path.startswith(p) for p in ['data/', '/data/', 'includes/', '__pycache__/']) or
            any(clean_path.endswith(ext) for ext in blocked_exts)):
            self.send_response(403)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.end_headers()
            self.wfile.write(b"403 Forbidden: Direct access to protected resources is restricted.")
            return

        super().do_GET()

    def do_POST(self):
        client_ip = self.get_client_ip()

        # 1. API: Login (Hardened with Rate-Limiting & Timing-Safe Verification)
        if self.path.startswith('/api/login'):
            if not check_login_rate_limit(client_ip):
                resp = {"status": "error", "message": "Too many failed login attempts. Please wait 5 minutes."}
                body = json.dumps(resp).encode('utf-8')
                self.send_response(429)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return

            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length).decode('utf-8', errors='ignore')

            params = {}
            content_type = self.headers.get('Content-Type', '')
            if 'application/json' in content_type:
                try:
                    params = json.loads(post_data)
                except Exception:
                    params = {}
            else:
                try:
                    parsed = urllib.parse.parse_qs(post_data)
                    for k, v in parsed.items():
                        params[k] = v[0] if v else ''
                except Exception:
                    params = {}

            username = (params.get('username') or '').strip().lower()
            password = params.get('password') or ''
            remember = bool(params.get('remember', False))

            users = []
            if os.path.exists(USERS_FILE):
                try:
                    with open(USERS_FILE, 'r', encoding='utf-8') as f:
                        users = json.load(f)
                except Exception:
                    users = []

            matched_user = None
            for u in users:
                if u.get('username', '').lower() == username and verify_password(u.get('password_hash'), password):
                    matched_user = {
                        "id": u.get("id"),
                        "username": u.get("username"),
                        "name": u.get("name"),
                        "role": u.get("role")
                    }
                    break

            if matched_user:
                clear_login_attempts(client_ip)
                token = secrets.token_hex(24)
                duration = (86400 * 7) if remember else 86400
                expires_at = time.time() + duration

                sessions = []
                if os.path.exists(SESSIONS_FILE):
                    try:
                        with open(SESSIONS_FILE, 'r', encoding='utf-8') as f:
                            sessions = json.load(f)
                    except Exception:
                        sessions = []

                sessions.append({
                    "token": token,
                    "user": matched_user,
                    "expires_at": expires_at
                })
                try:
                    with open(SESSIONS_FILE, 'w', encoding='utf-8') as f:
                        json.dump(sessions, f, indent=2)
                except Exception:
                    pass

                resp = {
                    "status": "success",
                    "token": token,
                    "user": matched_user
                }
                body = json.dumps(resp).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(body)))
                # Security: HttpOnly flag prevents cookie access via JavaScript (CWE-1004 Fix)
                self.send_header('Set-Cookie', f'kpl_session={token}; Path=/; Max-Age={duration}; HttpOnly; SameSite=Lax')
                self.end_headers()
                self.wfile.write(body)
                return
            else:
                record_failed_login(client_ip)
                resp = {
                    "status": "error",
                    "message": "Invalid username or password."
                }
                body = json.dumps(resp).encode('utf-8')
                self.send_response(401)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return

        # 1.5 API: Logout (Server-Side Session Revocation - CWE-613 Fix)
        if self.path.startswith('/api/logout'):
            token = self.get_session_token()
            if token and os.path.exists(SESSIONS_FILE):
                try:
                    with open(SESSIONS_FILE, 'r', encoding='utf-8') as f:
                        sessions = json.load(f)
                    sessions = [s for s in sessions if s.get('token') != token]
                    with open(SESSIONS_FILE, 'w', encoding='utf-8') as f:
                        json.dump(sessions, f, indent=2)
                except Exception:
                    pass

            resp = {"status": "success", "message": "Session invalidated"}
            body = json.dumps(resp).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(body)))
            self.send_header('Set-Cookie', 'kpl_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax')
            self.end_headers()
            self.wfile.write(body)
            return

        # 2. API: Save Master Data (STRICT AUTHENTICATION REQUIRED - CWE-306 Fix)
        if self.path.startswith('/api/save_data') or self.path.startswith('/api/save_products'):
            token = self.get_session_token()
            is_valid, _ = self.validate_session(token)
            if not is_valid:
                resp = {"status": "error", "message": "Unauthorized: Administrator session required"}
                body = json.dumps(resp).encode('utf-8')
                self.send_response(401)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return

            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length).decode('utf-8', errors='ignore')
            try:
                payload = json.loads(post_data)
            except Exception:
                payload = {}

            if 'products' in payload and isinstance(payload['products'], list):
                try:
                    with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
                        json.dump(payload['products'], f, indent=4, ensure_ascii=False)
                except Exception as e:
                    print(f"Error saving products: {e}")

            if 'categories' in payload and isinstance(payload['categories'], list):
                try:
                    with open(CATEGORIES_FILE, 'w', encoding='utf-8') as f:
                        json.dump(payload['categories'], f, indent=4, ensure_ascii=False)
                except Exception as e:
                    print(f"Error saving categories: {e}")

            if 'gallery' in payload and isinstance(payload['gallery'], list):
                try:
                    with open(GALLERY_FILE, 'w', encoding='utf-8') as f:
                        json.dump(payload['gallery'], f, indent=4, ensure_ascii=False)
                except Exception as e:
                    print(f"Error saving gallery: {e}")

            if 'enquiries' in payload and isinstance(payload['enquiries'], list):
                try:
                    with open(ENQUIRIES_FILE, 'w', encoding='utf-8') as f:
                        json.dump(payload['enquiries'], f, indent=4, ensure_ascii=False)
                except Exception as e:
                    print(f"Error saving enquiries: {e}")

            resp = {"status": "success", "message": "Master data synchronized successfully"}
            body = json.dumps(resp).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        # 2.5 API: Image Upload Handler (STRICT AUTHENTICATION REQUIRED - CWE-306 Fix)
        if self.path.startswith('/api/upload') or self.path.startswith('/api/upload.php'):
            token = self.get_session_token()
            is_valid, _ = self.validate_session(token)
            if not is_valid:
                resp = {"status": "error", "message": "Unauthorized: Administrator session required to upload files"}
                body = json.dumps(resp).encode('utf-8')
                self.send_response(401)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return

            import base64
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length).decode('utf-8', errors='ignore')
            try:
                payload = json.loads(post_data)
            except Exception:
                payload = {}

            folder = payload.get('folder', 'products')
            if folder not in ['products', 'gallery', 'categories']:
                folder = 'products'

            data_str = payload.get('data', '')
            ext = 'jpg'
            if 'data:image/' in data_str and ';base64,' in data_str:
                header_part, data_str = data_str.split(';base64,', 1)
                ext = header_part.split('data:image/')[-1].lower()
                if ext == 'jpeg': ext = 'jpg'
                if ext not in ['jpg', 'png', 'webp', 'gif']:
                    ext = 'jpg'

            try:
                img_bytes = base64.b64decode(data_str)
            except Exception:
                img_bytes = b''

            # Limit upload size to 8MB max
            if 0 < len(img_bytes) <= 8 * 1024 * 1024:
                target_dir = os.path.join(os.path.dirname(__file__), 'assets', 'images', folder)
                os.makedirs(target_dir, exist_ok=True)
                prefix = 'gal' if folder == 'gallery' else ('cat' if folder == 'categories' else 'prod')
                filename = f"{prefix}_{int(time.time())}_{secrets.token_hex(3)}.{ext}"
                file_path = os.path.join(target_dir, filename)
                with open(file_path, 'wb') as f:
                    f.write(img_bytes)

                pub_url = f"assets/images/{folder}/{filename}"
                resp = {"status": "success", "url": pub_url, "message": "Image uploaded successfully"}
                body = json.dumps(resp).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return
            else:
                resp = {"status": "error", "message": "No valid image data provided or file exceeds 8MB"}
                body = json.dumps(resp).encode('utf-8')
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return

        # 3. Handle enquiry submission from frontend forms (Rate Limited & Sanitized)
        if self.path.startswith('/api/enquiry.php') or self.path.startswith('/api/enquiry') or self.path.startswith('/api/save_enquiry'):
            if not check_enquiry_rate_limit(client_ip):
                resp = {"status": "error", "message": "Too many enquiry requests. Please wait a few minutes."}
                body = json.dumps(resp).encode('utf-8')
                self.send_response(429)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return

            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            content_type = self.headers.get('Content-Type', '')

            params = {}
            raw_text = post_data.decode('utf-8', errors='ignore')

            if 'application/json' in content_type:
                try:
                    params = json.loads(raw_text)
                except Exception:
                    params = {}

            if not params and ('multipart/form-data' in content_type or 'Content-Disposition: form-data' in raw_text or 'WebKitFormBoundary' in raw_text):
                try:
                    for part in raw_text.split('--'):
                        if 'name="' in part:
                            sep = '\r\n\r\n' if '\r\n\r\n' in part else '\n\n'
                            hb = part.split(sep, 1)
                            if len(hb) == 2:
                                m = re.search(r'name="([^"]+)"', hb[0])
                                if m:
                                    params[m.group(1)] = hb[1].strip()
                except Exception:
                    pass

            if not params or len(params) == 0:
                try:
                    parsed = urllib.parse.parse_qs(raw_text)
                    for k, v in parsed.items():
                        params[k] = v[0] if v else ''
                except Exception:
                    pass

            # Anti-Spam: Honeypot trap check
            if params.get('website_hp'):
                resp = {"status": "success", "message": "Enquiry received"}
                body = json.dumps(resp).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(body)
                return

            # Security: Sanitize all inputs to prevent Stored XSS (CWE-79)
            raw_name = html.escape((params.get('name') or '').strip()[:80]) or 'Direct Buyer'
            raw_phone = html.escape((params.get('phone') or '').strip()[:30]) or '+91 96551 55266'
            raw_whatsapp = html.escape((params.get('whatsapp') or '').strip()[:30]) or raw_phone
            raw_email = html.escape((params.get('email') or '').strip()[:100]) or 'info@client.in'
            raw_product = html.escape((params.get('product') or params.get('lubricant') or '').strip()[:120]) or 'General Lubricant Enquiry'
            raw_quantity = html.escape((params.get('quantity') or params.get('volume') or '').strip()[:80]) or 'Standard Consignment'
            raw_company = html.escape((params.get('company') or params.get('company_name') or '').strip()[:100]) or 'Direct Client'
            raw_location = html.escape((params.get('location') or '').strip()[:100]) or 'Coimbatore, Tamil Nadu'
            raw_amount = html.escape((params.get('amount') or params.get('quote_value') or 'Pending Quote').strip()[:40])
            raw_message = html.escape((params.get('message') or params.get('notes') or '').strip()[:1500]) or 'Direct online enquiry from contact page.'

            ref_id = f"ENQ-{int(time.time())}-{int(time.time() * 1000) % 1000}"
            now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            new_record = {
                "id": ref_id,
                "date": now_str,
                "name": raw_name,
                "company": raw_company,
                "company_name": raw_company,
                "phone": raw_phone,
                "whatsapp": raw_whatsapp,
                "email": raw_email,
                "lubricant": raw_product,
                "product": raw_product,
                "volume": raw_quantity,
                "quantity": raw_quantity,
                "location": raw_location,
                "amount": raw_amount if (raw_amount.startswith('₹') or 'Pending' in raw_amount) else f"₹ {raw_amount}",
                "quote_value": raw_amount if (raw_amount.startswith('₹') or 'Pending' in raw_amount) else f"₹ {raw_amount}",
                "status": "new",
                "priority": "High",
                "assigned_to": "Sales Desk (Immediate)",
                "notes": raw_message,
                "message": raw_message,
                "ip_address": client_ip
            }

            try:
                enquiries = []
                if os.path.exists(ENQUIRIES_FILE):
                    with open(ENQUIRIES_FILE, 'r', encoding='utf-8') as f:
                        enquiries = json.load(f)
                enquiries.insert(0, new_record)
                with open(ENQUIRIES_FILE, 'w', encoding='utf-8') as f:
                    json.dump(enquiries, f, indent=4, ensure_ascii=False)
            except Exception as e:
                print(f"Error saving to enquiries.json: {e}")

            # Instant Notification Engine
            dispatch_email_notification(new_record)
            lead_notify = format_lead_notification(new_record)

            resp_payload = {
                "status": "success",
                "message": f"Thank you {raw_name}! Your enquiry has been received. Our sales desk has been notified.",
                "ref_id": ref_id,
                "whatsapp_url": lead_notify['wa_karan'],
                "whatsapp_founder_url": lead_notify['wa_founder'],
                "record": new_record
            }
            body = json.dumps(resp_payload).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        super().do_POST()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    ThreadingHTTPServer.request_queue_size = 128
    server = ThreadingHTTPServer(('0.0.0.0', port), HardenedHTTPRequestHandler)
    print(f'Serving multithreaded with HARDENED SECURITY, AUTH, & NO-CACHE on port {port}...')
    server.serve_forever()
