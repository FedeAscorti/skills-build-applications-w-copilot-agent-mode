from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def setUp(self):
        marvel = Team.objects.create(name='Marvel', universe='Marvel')
        dc = Team.objects.create(name='DC', universe='DC')
        user1 = User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel)
        user2 = User.objects.create(name='Batman', email='batman@dc.com', team=dc)
        Activity.objects.create(user=user1, type='Running', duration=30, date='2025-11-10')
        Workout.objects.create(name='Hero Training', description='Intense workout for heroes')
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=80)

    def test_user_team(self):
        user = User.objects.get(email='spiderman@marvel.com')
        self.assertEqual(user.team.name, 'Marvel')

    def test_leaderboard(self):
        marvel = Team.objects.get(name='Marvel')
        lb = Leaderboard.objects.get(team=marvel)
        self.assertEqual(lb.points, 100)
