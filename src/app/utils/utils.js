export const toSlug = (str) => {
    return str
      .toLowerCase() // Convert the string to lowercase
      .trim() // Trim whitespace from both ends of the string
      .replace(/[^\w\s-]/g, "") // Remove all non-word characters except for spaces and hyphens
      .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
  };
  