const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

// ================== GOOGLE OAUTH STRATEGY ==================
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL || "http://localhost:5000"}/auth/google/callback`
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // 1. Check if user already exists with Google ID
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            return done(null, user);
          }

          // 2. Check if user exists with same email but no Google ID (link accounts)
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            user.googleId = profile.id;
            await user.save();
            return done(null, user);
          }

          // 3. Create new user
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
            role: 'student' // Default role
          });

          await user.save();
          done(null, user);
        } catch (error) {
          console.error("❌ Google Strategy Error:", error);
          done(error, null);
        }
      }
    )
  );
} else {
  console.warn('⚠️ Google OAuth credentials not found. Google Sign-In will be disabled.');
}

// ================== JWT STRATEGY ==================
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET || 'fallback_jwt_secret_for_development';

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      console.error("❌ JWT Strategy Error:", error);
      return done(error, false);
    }
  })
);

module.exports = passport;
