from app import app, db
from flask import request, jsonify
from models import Friend
from utils.validation import validate_friend_data
from sqlalchemy.exc import SQLAlchemyError
from flask_cors import cross_origin


# Get all friends
@app.route("/api/friends", methods=["GET"])
@cross_origin()
def get_friends():
    try:
        friends = Friend.query.all()
        result = [friend.to_json() for friend in friends]
        return jsonify({"data": result})

    except SQLAlchemyError as db_err:
        return jsonify({"Error": "Database error occurred while fetching friends. {}".format(db_err)}), 500

    except Exception as e:
        return jsonify({"Error": "An unexpected error occurred. {}".format(e)}), 500


# Create a friend
@app.route("/api/friends", methods=["POST"])
@cross_origin()
def create_friend():
    avatar_base_url = "https://avatar.iran.liara.run/public"
    try:
        data = request.json  # Take request and convert to json
        validate_friend_data(data)

        name = data.get('name')
        role = data.get('role')
        description = data.get('description')
        gender = data.get('gender')

        # Fetch avatar based on gender
        if gender == 'male':
            img_url = f"{avatar_base_url}/boy?username={name}"
        elif gender == 'female':
            img_url = f"{avatar_base_url}/girl?username={name}"
        else:
            return jsonify({"Error": "Invalid gender value."}), 400

        new_friend = Friend(
            name=name, role=role, description=description, gender=gender, img_url=img_url)

        db.session.add(new_friend)
        db.session.commit()

        return jsonify({"message": "Friend created successfully", "data": new_friend.to_json()}), 201

    except ValueError as e:
        return jsonify({"Error": str(e)}), 400

    except SQLAlchemyError as db_err:
        db.session.rollback()
        return jsonify({"Error": f"(Database error occurred: {db_err}"}), 500

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {e}"}), 500


# Delete a friend
@app.route("/api/friends/<int:id>", methods=["DELETE"])
@cross_origin()
def delete_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"Error": "Friend not found"}), 404

        db.session.delete(friend)
        db.session.commit()

        return jsonify({"message": "Friend deleted successfully"}), 200

    except SQLAlchemyError as db_err:
        db.session.rollback()
        return jsonify({"Error": "Database error occurred. {}".format(db_err)}), 500

    except Exception as e:
        return jsonify({"Error": "An unexpected error occurred. {}".format(e)}), 500


# Update a friend
@app.route("/api/friends/<int:id>", methods=["PATCH"])
@cross_origin()
def update_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"Error": "Friend not found"}), 404

        data = request.json

        friend.name = data.get("name", friend.name)
        friend.role = data.get("role", friend.role)
        friend.description = data.get("description", friend.description)
        friend.gender = data.get("gender", friend.gender)

        db.session.commit()
        return jsonify(
            {
                "message": "Friend updated successfully",
                "data": friend.to_json()
            }
        ), 200

    except SQLAlchemyError as db_err:
        db.session.rollback()
        return jsonify({"Error": "Database error occurred: {}".format(db_err)}), 500

    except Exception as e:
        return jsonify({"Error": "An unexpected error occurred: {}".format(e)}), 500
