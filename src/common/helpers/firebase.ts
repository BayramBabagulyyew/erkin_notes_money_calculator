export async function sendFirebaseNotification(title: string, body: string) {
  try {
    const serverKey = process.env.FCM_SERVER_KEY;
    if (!serverKey) return;
    await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${serverKey}`,
      },
      body: JSON.stringify({
        to: '/topics/all',
        notification: { title, body },
      }),
    });
  } catch (e) {
    console.log(e);
  }
}
