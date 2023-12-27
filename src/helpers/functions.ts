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

export const openInNewTab = (
  url: string,
  windowName: string = "_blank",
  windowFeatures: string = "noopener,noreferrer"
) => {
  const newWindow = window.open(url, windowName, windowFeatures);
  if (newWindow) window.opener = null;
};

// Here’s a step-by-step breakdown of how the function works:
// The raw array is transformed into an array of key-value pairs using the map method. Each key-value pair consists of an element’s id property as the key and the entire element as the value.
// The key-value pairs are used to create a new Map object.
// The sorted array is transformed into a new array using the map method. For each element in sorted, the get method of the Map object is called with the id property of the element as the argument. This returns the corresponding element from the raw array.
// The resulting array is returned.
export const sortArray = (unsortedArray: any[], order: string[]) =>
  ((m) => order.map((id) => m.get(id)))(new Map(unsortedArray.map((r) => [r.id, r])));
