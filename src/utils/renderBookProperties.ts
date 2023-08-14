export function getTitle(title: string) {
  if (title.length > 15) {
    return title.slice(0, 20) + "...";
  }

  return title;
}

export function getDescription(description: string) {
  if (description.length > 50) {
    return description.slice(0, 50) + "...";
  }

  return description;
}
