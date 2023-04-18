import firebase_admin
from firebase_admin import credentials, messaging

firebase_cred = credentials.Certificate(r"C:\Users\admin\Desktop\desktop\web\lunch_booking\json\firebase.json")
firebase_app = firebase_admin.initialize_app(firebase_cred)

# This registration token comes from the client FCM SDKs.
registration_token = 'd7T8cSdSRHDXijdBaWPIxO:APA91bF4r5l2phbAIabFWSXbRxr8k6TjmmFQsFgOscH5igAwcooF8P9H-7Kf9PHMM9jzEJjTvk1Ctid8LIg7WMI6_ajbsY-b0VMZd41iLLrwtUjNNBzQXvJuu3yTKJimwmmaqhF8Yyaj'

# See documentation on defining a message payload.
message = messaging.Message(
    data={
        'score': '850',
        'time': '2:45',
    },
    token=registration_token,
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