import paho.mqtt.client as mqtt

BROKER = "45.56.74.248"
PORT = 1883
USERNAME = "fisica"
PASSWORD = "iotfisica"
TOPIC = "iot/simulaciones/RGB/equipoMM"   # exacto
# TOPIC = "iot/simulaciones/RGB/#"        # para ver todo ese subárbol

def on_connect(client, userdata, flags, reason_code, properties):
    print(f"Conectado. reason_code={reason_code}")
    client.subscribe(TOPIC)
    print(f"Suscrito a: {TOPIC}")

def on_message(client, userdata, msg):
    try:
        payload = msg.payload.decode("utf-8")
    except UnicodeDecodeError:
        payload = msg.payload
    print(f"Tópico: {msg.topic} | QoS: {msg.qos} | Mensaje: {payload}")

def on_disconnect(client, userdata, reason_code, properties):
    print(f"Desconectado. reason_code={reason_code}")

client = mqtt.Client(callback_api_version=mqtt.CallbackAPIVersion.VERSION2)
client.username_pw_set(USERNAME, PASSWORD)

client.on_connect = on_connect
client.on_message = on_message
client.on_disconnect = on_disconnect

client.connect(BROKER, PORT, keepalive=60)
client.loop_forever()