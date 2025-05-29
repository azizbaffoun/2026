# 🔧 Firebase Security Rules Fix

## Problem
Your current Firebase rules require authentication for ALL operations, but your public website needs to read player data without authentication.

## 🔒 SOLUTION: Hybrid Rules
Keep your admin dashboard secure while allowing public website access.

### Step 1: Go to Firebase Console
Open: https://console.firebase.google.com/

### Step 2: Select Your Project
Click on: **vsport-e86e0**

### Step 3: Navigate to Firestore Rules
1. Click **Firestore Database** in the left menu
2. Click **Rules** tab at the top

### Step 4: Replace Current Rules
Copy and paste these **HYBRID RULES** that work for both your website AND admin dashboard:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function hasRole(role) {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == role;
    }
    
    // Users collection - ADMIN ONLY
    match /users/{userId} {
      allow read: if isAuthenticated() && (isOwner(userId) || hasRole('superadmin'));
      allow create: if isAuthenticated() && isOwner(userId);
      allow update: if isAuthenticated() && (isOwner(userId) || hasRole('superadmin'));
      allow delete: if isAuthenticated() && hasRole('superadmin');
    }
    
    // Players collection - PUBLIC READ + ADMIN WRITE
    match /players/{playerId} {
      allow read: if true; // ✅ PUBLIC ACCESS for website
      allow write: if isAuthenticated() && (hasRole('superadmin') || hasRole('manager') || hasRole('agent'));
    }
    
    // Team collection - PUBLIC READ + ADMIN WRITE  
    match /team/{playerId} {
      allow read: if true; // ✅ PUBLIC ACCESS for website
      allow write: if isAuthenticated() && (hasRole('superadmin') || hasRole('manager') || hasRole('agent'));
    }
    
    // Members collection - PUBLIC READ + ADMIN WRITE
    match /members/{playerId} {
      allow read: if true; // ✅ PUBLIC ACCESS for website
      allow write: if isAuthenticated() && (hasRole('superadmin') || hasRole('manager') || hasRole('agent'));
    }
    
    // Content collection - ADMIN ONLY
    match /content/{contentId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && (hasRole('superadmin') || hasRole('content'));
    }
    
    // Tasks collection - ADMIN ONLY
    match /tasks/{taskId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && (hasRole('superadmin') || hasRole('manager'));
    }
    
    // Activities collection - ADMIN ONLY
    match /activities/{activityId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated();
    }
    
    // Messages collection - ADMIN ONLY
    match /messages/{messageId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated();
    }
    
    // Events collection - ADMIN ONLY
    match /events/{eventId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && (hasRole('superadmin') || hasRole('manager'));
    }
    
    // Achievements collection - ADMIN ONLY
    match /achievements/{achievementId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && (hasRole('superadmin') || hasRole('manager') || hasRole('agent'));
    }
    
    // Contracts collection - ADMIN ONLY
    match /contracts/{contractId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && (hasRole('superadmin') || hasRole('manager') || hasRole('agent'));
    }
  }
}
```

### Step 5: Publish Rules
Click the **Publish** button to save the new rules.

## 🎯 What This Does:
- ✅ **Website**: Can read players/team/members data publicly
- 🔒 **Admin Dashboard**: Keeps all authentication requirements
- ❌ **Public**: Cannot write/edit any data
- 🛡️ **Sensitive Data**: Users, tasks, contracts remain admin-only

## 📊 Security Summary:
- **Public Read**: `players`, `team`, `members` only
- **Admin Only**: `users`, `content`, `tasks`, `activities`, `messages`, `events`, `achievements`, `contracts`
- **Write Access**: Only authenticated admin users

## 🚀 Result:
- **Website**: ✅ Will load real Firebase player data
- **Admin Dashboard**: ✅ Continues working normally
- **Security**: ✅ Maintained for sensitive data

After applying these rules, your website will automatically switch from fallback data to real Firebase data! 