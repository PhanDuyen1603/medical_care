export default function slugify(str) {
  // Convert to lowercase and trim whitespace
  const trimmed = str.toLowerCase().trim();

  // Remove accents (optional)
  const removeAccents = trimmed.replace(/\u00C0|\u00E0|\u00C8|\u00E8|\u00CC|\u00EC|\u0130|\u0131/g, 'a')
    .replace(/\u00D0|\u00F0|\u00D8|\u00F8/g, 'o')
    .replace(/\u00C5|\u00E5|\u00D5|\u00F5|\u0160|\u0161/g, 'u')
    .replace(/\u00D1|\u00F1/g, 'n');

  // Replace unwanted characters with spaces
  const withSpaces = removeAccents.replace(/[^a-z0-9 ]/g, ' ');

  // Replace multiple spaces or dashes with a single dash
  return withSpaces.replace(/\s+|-+/g, '-');
}