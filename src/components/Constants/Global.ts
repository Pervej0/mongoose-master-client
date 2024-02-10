const currentYear = new Date().getFullYear();
export const yearOptions = [1, 2, 3, 4].map((item) => ({
  value: String(currentYear + item),
  label: String(currentYear + item),
}));

export const startDateOptions = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const bloodGroupOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));
