export const formatQBName = (qbName) => {
  if (typeof qbName === "string") return qbName;

  if (Array.isArray(qbName)) {
    return qbName
      .map((person) =>
        [
          person.lastName,
          ", ",
          person.firstName,
          person.middleName,
          person.suffix,
        ]
          .filter(Boolean)
          .join(" ")
          .replace(",  ", ", ")
          .trim(),
      )
      .join(" ");
  }

  return "-";
};
