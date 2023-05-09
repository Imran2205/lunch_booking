import firebase_admin
from firebase_admin import credentials, messaging

firebase_cred = credentials.Certificate(r"C:\Users\admin\Desktop\desktop\web\lunch_booking\json\firebase.json")
firebase_app = firebase_admin.initialize_app(firebase_cred)

# This registration token comes from the client FCM SDKs.
# registration_token = 'dPK5MvZi9S7SAHvWx7VhgL:APA91bH3FUc_OV30i2vN7MhNUiF-KUPrC5N0AKZgddX3_J1IevRlL8Pea50cf_z36aYHI0RsDa2HKFxLP071yD_E2zt9nwvRY3lZzOsK2CMBeGq_e5rhyIxnm4kOxIP1Z-P7-F26Sk_F'

# See documentation on defining a message payload.
message = messaging.Message(
    data={
        'title': 'Have you booked your lunch for tomorrow?',
        'text': 'Please book your lunch by 8 p.m. Click on the notification to visit lunch booking URL. If you have already booked your lunch then please ignore this notification.',
        'url': 'https://www.ulka.autos/lunch-booking'
    },
    topic='all'
)

# Send a message to the device corresponding to the provided
# registration token.
response = messaging.send(message)
# Response is a message ID string.
print('Successfully sent message:', response)


"""
curl -X POST -H "Authorization: key=AAAA9oc0pMw:APA91bEceXs98Fz5-QzC93dsbSysKidTmYXa2mVUbGVqBZvrs_AUtPomVyTY7LuWaJgPjg0ncqOWWXa2k8EvSNK70_cBf6xj-ge2ys7aeNscvmzRMnT5m-UanVR8dY5k5-B7_5QGcJl5" -H "Content-Type: application/json" -d '{
"notification": {
"title": "First notif",
"body": "Hello world"
},
"to": "fYkON1hLmv2iVUzSuWc9au:APA91bE_nFWqldvzO3P-kuwvui9N01BBY8zrRuhu9laoPhFzz3kMKHHqCkQbdYDtC88-IY_owln6hrFKnTXaemDybP5YaebGKZK3pWmNSOzcJ2RkXSwO_YM-hDZFdqoQa5gatqVwE8xZ"
}' "https://fcm.googleapis.com/fcm/send"
"""