from django.core.management.base import BaseCommand
from django.conf import settings
from djongo import models
from django.contrib.auth.models import User
from pymongo import MongoClient

# Sample data for superheroes
USERS = [
    {"name": "Clark Kent", "email": "superman@dc.com", "team": "dc"},
    {"name": "Bruce Wayne", "email": "batman@dc.com", "team": "dc"},
    {"name": "Diana Prince", "email": "wonderwoman@dc.com", "team": "dc"},
    {"name": "Tony Stark", "email": "ironman@marvel.com", "team": "marvel"},
    {"name": "Steve Rogers", "email": "captainamerica@marvel.com", "team": "marvel"},
    {"name": "Peter Parker", "email": "spiderman@marvel.com", "team": "marvel"},
]

TEAMS = [
    {"name": "marvel", "members": ["Tony Stark", "Steve Rogers", "Peter Parker"]},
    {"name": "dc", "members": ["Clark Kent", "Bruce Wayne", "Diana Prince"]},
]

ACTIVITIES = [
    {"user": "Clark Kent", "activity": "Flight", "duration": 60},
    {"user": "Bruce Wayne", "activity": "Martial Arts", "duration": 45},
    {"user": "Tony Stark", "activity": "Engineering", "duration": 120},
]

LEADERBOARD = [
    {"team": "marvel", "points": 300},
    {"team": "dc", "points": 250},
]

WORKOUTS = [
    {"name": "Super Strength", "description": "Heavy lifting and resistance training."},
    {"name": "Agility Training", "description": "Speed and flexibility drills."},
]

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient("mongodb://localhost:27017")
        db = client["octofit_db"]

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Insert data
        db.users.insert_many(USERS)
        db.teams.insert_many(TEAMS)
        db.activities.insert_many(ACTIVITIES)
        db.leaderboard.insert_many(LEADERBOARD)
        db.workouts.insert_many(WORKOUTS)

        # Create unique index on email
        db.users.create_index([("email", 1)], unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
