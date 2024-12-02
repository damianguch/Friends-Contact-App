from flask import jsonify


def validate_friend_data(data):
    if not data:
        return jsonify({"Error": "Invalid input data"}), 400

    required_fields = ["name", "role", "description", "gender"]
    for field in required_fields:
        value = data.get(field)
        if not value or not isinstance(value, str) or value.strip() == "":
            raise ValueError(
                f"Field '{field}' is required and must be a non-empty string.")

    if data.get("gender") not in ["male", "female"]:
        raise ValueError("Gender must be 'male' or 'female'.")
