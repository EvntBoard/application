## template_condition
```json
    {
      "id": "943480e8-854c-4145-805f-75bcdb37b99e",
      "name": "twitch custom reward",
      "description": null,
      "event": "twitch-message",
      "params": [
        {
          "name": "Votre id récompenses",
          "key": "id_custom_reward",
          "type": "string"
        }
      ],
      "template": "module.exports = (triggerId, evntData) => {\n    return evntData.msg._tags.get('custom-reward-id') === '{id_custom_reward}'\n}"
    }
```

## template_reaction
```json
    {
      "id": "943480e8-854c-4145-805f-75bcdb37b99e",
      "name": "play sound",
      "description": null,
      "params": [
        {
          "name": "Votre son",
          "key": "sound",
          "type": "string"
        }
      ],
      "template": "module.exports = async (data, services) => {\n  await services.player.play('{sound}')\n}"
    }
```

Sur trigger
```json
{
      "id": "e5bd20be-3bda-47b7-a5c7-7d6171e0d5ef",
      "type": 3,
      "locker": null,
      "name": "tts",
      "description": null,
      "events": [
        {
          "id_template": "943480e8-854c-4145-805f-75bcdb37b99e",
          "event": "twitch-message",
          "params": { "id_custom_reward" : "dc6cae30-e783-4d51-8ea3-1e0a0d2ef060" },
          "condition": "module.exports = (triggerId, evntData) => {\n    return evntData.msg._tags.get('custom-reward-id') === 'dc6cae30-e783-4d51-8ea3-1e0a0d2ef060'\n}"
        }
      ],
      "reaction": "module.exports = async (data, services) => {\n  await services.player.tts(data.message)\n}"
    }
```
