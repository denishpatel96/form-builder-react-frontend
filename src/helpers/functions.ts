import md5 from "md5";

export const getGravatarURL = (email: string) => {
  // Trim leading and trailing whitespace from
  // an email address and force all characters
  // to lower case
  const address = String(email).trim().toLowerCase();

  // Create an MD5 hash of the final string
  const hash = md5(address);

  // "d" - Default
  // 404: do not load any image if none is associated with the email hash, instead return an HTTP 404 (File Not Found) response
  // mp: (mystery-person) a simple, cartoon-style silhouetted outline of a person (does not vary by email hash)
  // identicon: a geometric pattern based on an email hash
  // monsterid: a generated 'monster' with different colors, faces, etc
  // wavatar: generated faces with differing features and backgrounds
  // retro: awesome generated, 8-bit arcade-style pixelated faces
  // robohash: a generated robot with different colors, faces, etc
  // blank: a transparent PNG image (border added to HTML below for demonstration purposes)

  // "r" - Rating
  // g: suitable for display on all websites with any audience type.
  // pg: may contain rude gestures, provocatively dressed individuals, the lesser swear words, or mild violence.
  // r: may contain such things as harsh profanity, intense violence, nudity, or hard drug use.
  // x: may contain hardcore sexual imagery or extremely disturbing violence.

  // "s" - Size

  return `https://www.gravatar.com/avatar/${hash}?d=404&r=g&s=40`;
};
