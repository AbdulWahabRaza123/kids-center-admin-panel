export function maskEmail(email: string) {
  if (!email) {
    return "";
  }
  const [user, domain] = email.split("@");
  const firstPart = user.slice(0, 3);
  const lastPart = user.slice(-3);
  const maskedUser = `${firstPart}...${lastPart}`;
  return `${maskedUser}@${domain}`;
}
