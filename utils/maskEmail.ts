/**
 * Mask email
 * @param email Email to mask
 * @returns Masked email
 */
export const maskEmail = (email = "johndoe@mail.com	") => {
  const mask = `\*\*\*`;
  const [name, domain] = email.split("@");

  if (domain) {
    let [, org] = domain.split(".");
    const maskedEmail = name + "@" + mask + "." + org;
    return maskedEmail;
  }

  return email;
};
