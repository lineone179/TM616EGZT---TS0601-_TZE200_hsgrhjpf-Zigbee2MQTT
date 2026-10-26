Custom Converter for Tuya TM616EGZT (Zigbee2MQTT)


This external converter is designed for calibrating the limit positions (borders) of Tuya curtain motors that are recognized in Zigbee2MQTT as _TZE200_hsgrhjpf (e.g., model TM616EGZT with M515/M616 board).

🚨 The Problem
The standard Zigbee2MQTT converter (TS0601_cover_1) allows you to control the curtain but does not provide a way to set the upper and lower limits (Border). Additionally, for this specific motor revision, setting limits via physical buttons or an RF remote may not work. The Tuya app hides the actual Data Points (DPs), which is why standard calibration methods fail.

✅ The Solution
This converter adds a Border block to the Zigbee2MQTT interface, which sends the correct string commands (up, down) to Data Point 16. This allows the motor to beep and save the current curtain position as a limit point.

🛠️ Installation
Ensure you have Zigbee2MQTT version 2.11.0 or higher installed (the external converter mechanism may differ in older versions).

Enable support for external converters in your Zigbee2MQTT configuration file (configuration.yaml):

yaml
advanced:
  enable_external_js: true
Create an external_converters folder in your Zigbee2MQTT directory (if it doesn't exist).

Copy the curtain_custom.mjs file from this repository into the external_converters folder.

Restart Zigbee2MQTT.

You should see the following line in the logs: Loaded external converter 'curtain_custom.mjs'.

📖 How to Use
After installation, a Border block will appear in the device card under the "Exposes" tab:

Upper Limit: Manually raise the curtain (or use the interface button) to the highest position. In the Border block, select up and click the send (SET) button. The motor should beep/flash.

Lower Limit: Lower the curtain to the lowest position. In the Border block, select down and send the command.

Reset: To delete a limit, select up_delete or down_delete accordingly.

Important: If you send up or down commands via MQTT, the command must be sent as a string: {"border": "up"}. Numeric values (0 or 1) may not work for this motor model.

⚙️ Technical Details
Model: TM616EGZT (Tuya)

Identifier: _TZE200_hsgrhjpf

Chip: Z2S3L (M515/M616 board)

Key DP: 16 (Border / Limits)

Data Format: Strings ("up", "down", "up_delete", "down_delete")

⚠️ Disclaimer
This converter is an unofficial solution based on community trial and error. Use it at your own risk. The author is not responsible for any potential device malfunctions.

🤝 Acknowledgements
Thanks to the Zigbee2MQTT community and the participants of GitHub discussions for the insights regarding DP 16 and string commands.
