type Bucket = {
  count: number;
  resetAt: number;
  fingerprints: Map<string, number>;
};

const buckets = new Map<string, Bucket>();

export function rateLimit({
  key,
  fingerprint,
  limit = 5,
  windowMs = 10 * 60 * 1000
}: {
  key: string;
  fingerprint?: string;
  limit?: number;
  windowMs?: number;
}) {
  const now = Date.now();
  const existing = buckets.get(key);
  const bucket =
    existing && existing.resetAt > now
      ? existing
      : {
          count: 0,
          resetAt: now + windowMs,
          fingerprints: new Map<string, number>()
        };

  bucket.count += 1;

  if (fingerprint) {
    const lastSeen = bucket.fingerprints.get(fingerprint) || 0;
    bucket.fingerprints.set(fingerprint, now);
    if (now - lastSeen < 60 * 1000) {
      buckets.set(key, bucket);
      return { allowed: false, reason: "Repeated submission detected. Please wait a minute and try again." };
    }
  }

  buckets.set(key, bucket);

  if (bucket.count > limit) {
    return { allowed: false, reason: "Too many requests. Please try again later." };
  }

  return { allowed: true };
}
