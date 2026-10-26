export const submitWorkshopLead = async ({
  firstName,
  name,
  email,
  topic = 'Motherhood',
}) => {
  const time = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  const response = await fetch('/api/workshop', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic,
      firstName: firstName || name,
      name: firstName || name,
      email,
      time,
    }),
  });


  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to submit workshop registration.');
  }

  return data;
};
