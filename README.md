# MDNS-Check-and-Request-with-react-native
MDNS Check and request
# To work with it:
First create a react native app with expo, then add all the libs and android manifest
__lib list__
``` JSON
"expo": "~52.0.39",
        "expo-dev-client": "^5.0.14",
        "expo-network": "^7.0.5",
        "expo-status-bar": "~2.0.1",
        "react-native-axios": "^0.17.1",
        "react-native-ble-plx": "^3.5.0",
        "react-native-elements": "^3.4.3",
        "react-native-safe-area-context": "^5.3.0",
        "react-native-safe-area-view": "^2.0.0",
        "react-native-zeroconf": "^0.13.8"
```
Then type in termina ``` npx expo prebuild ``` which will generate native android folder.
__Android Manifest__

``` Xml
 <uses-permission-sdk-23 android:name="android.permission.ACCESS_COARSE_LOCATION"/>
  <uses-permission-sdk-23 android:name="android.permission.ACCESS_FINE_LOCATION"/>
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
  <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
  <uses-permission android:name="android.permission.BLUETOOTH" android:maxSdkVersion="30"/>
  <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" android:maxSdkVersion="30"/>
  <uses-permission android:name="android.permission.BLUETOOTH_CONNECT"/>
  <uses-permission android:name="android.permission.BLUETOOTH_SCAN"/>
  <uses-permission android:name="android.permission.CHANGE_WIFI_MULTICAST_STATE"/>
  <uses-permission android:name="android.permission.INTERNET"/>
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
  <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
  <uses-permission android:name="android.permission.VIBRATE"/>
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

Then use eas to build the app and install it locally on your android device.
