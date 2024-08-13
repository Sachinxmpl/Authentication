## What is JWT (JSON Web Token)

JWT is a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.

### Structure of a JWT

A JWT consists of three parts separated by dots (`.`):

1. Header
2. Payload
3. Signature

#### Example of an encoded JWT:


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c


### Decoded JWT

#### 1. Header

{
  "alg": "HS256",
  "typ": "JWT"
}

- `alg`: The algorithm used for signing (e.g., HMAC SHA256 or RSA).
- `typ`: The type of token (JWT).

#### 2. Payload

{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}

- Contains claims (statements about the user) and additional data.
- Common claims:
  - `sub` (subject): Identifier for the user.
  - `iat` (issued at): Timestamp of token creation.
  - `exp` (expiration time): Timestamp of token expiration.

#### 3. Signature

HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  your-256-bit-secret
)

- Verifies that the sender of the JWT is who it says it is.
- Ensures that the message wasn't changed along the way.

## Authentication vs Authorization

- **Authentication**: Verifies the identity of a user or client.
- **Authorization**: Determines what resources an authenticated user has access to.

## JWT vs Sessions

| JWT | Sessions |
|-----|----------|
| Stateless | Stateful |
| Scalable | Less scalable |
| Can be used across different domains | Typically bound to a single domain |
| Stored client-side | Stored server-side |

## Securely Storing JWT on Client-side

1. **HTTP-only Cookies**: 
   - Pros: Cannot be accessed by JavaScript, mitigating XSS attacks.
   - Cons: Vulnerable to CSRF attacks unless additional measures are taken.

2. **Local Storage**: 
   - Pros: Easy to implement.
   - Cons: Vulnerable to XSS attacks.

3. **Memory (JavaScript variable)**:
   - Pros: Not accessible by XSS unless the attacker can execute code in the same origin.
   - Cons: Lost on page refresh.

4. **Refresh Token Strategy** (Recommended):
   - Short-lived access token (e.g., 15 minutes) stored in memory.
   - Long-lived refresh token stored in an HTTP-only cookie.
   - Refresh the access token periodically using the refresh token.

## Best Practices

1. Use HTTPS to encrypt the token during transmission.
2. Set appropriate expiration times for tokens.
3. Validate tokens on the server-side for each request.
4. Implement token revocation mechanisms.
5. Use strong, unique secrets for signing tokens.
6. Minimize sensitive data in the payload.

## Common Use Cases

- Single Sign-On (SSO)
- API Authentication
- Stateless session management
- Information Exchange

By understanding and implementing JWT correctly, you can create more secure and scalable authentication systems for your applications.
