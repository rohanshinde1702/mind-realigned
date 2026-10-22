export const submitLead = async ({
  firstName,
  email,
  phoneNumber,
  selectedCourse,
  courseName,
}) => {
  const course = selectedCourse || courseName || '';
  const time = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      selectedCourse: course,
      firstName,
      phoneNumber,
      email,
      time,
    }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to submit lead.');
  }

  return data;
};
