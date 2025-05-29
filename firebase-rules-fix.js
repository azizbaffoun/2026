// Firebase Security Rules Fix
// Copy these rules to your Firebase Console -> Firestore Database -> Rules

/*
STEP 1: Go to Firebase Console (https://console.firebase.google.com/)
STEP 2: Select your project: vsport-e86e0
STEP 3: Go to Firestore Database -> Rules
STEP 4: Replace the current rules with these:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to players collection
    match /players/{document} {
      allow read: if true;
      allow write: if false; // Only allow reads, not writes
    }
    
    // Allow read access to team collection
    match /team/{document} {
      allow read: if true;
      allow write: if false;
    }
    
    // Allow read access to members collection
    match /members/{document} {
      allow read: if true;
      allow write: if false;
    }
    
    // Allow read access to any collection that starts with capital letters
    match /{collection}/{document} {
      allow read: if collection in ['Players', 'Team', 'Members'];
      allow write: if false;
    }
  }
}

STEP 5: Click "Publish" to save the rules
*/

// Alternative: Use Firebase Admin SDK or create a simple API endpoint
// If you can't change the rules, here's a workaround using a proxy

console.log('🔧 Firebase Rules Fix Instructions:');
console.log('1. Go to https://console.firebase.google.com/');
console.log('2. Select project: vsport-e86e0');
console.log('3. Go to Firestore Database -> Rules');
console.log('4. Copy the rules from this file');
console.log('5. Click Publish');

// Temporary workaround - Mock data until rules are fixed
const mockPlayersData = [
    {
        id: "1",
        name: "أحمد محمد",
        position: "مهاجم",
        age: 25,
        nationality: "السعودية",
        image: "images/player1.jpg",
        stats: {
            goals: 15,
            assists: 8,
            matches: 22
        }
    },
    {
        id: "2", 
        name: "محمد علي",
        position: "وسط",
        age: 28,
        nationality: "مصر",
        image: "images/player2.jpg",
        stats: {
            goals: 5,
            assists: 12,
            matches: 20
        }
    },
    {
        id: "3",
        name: "عبدالله سالم",
        position: "مدافع",
        age: 26,
        nationality: "الإمارات",
        image: "images/player3.jpg",
        stats: {
            goals: 2,
            assists: 3,
            matches: 24
        }
    }
];

// Function to use mock data temporarily
function loadMockPlayers() {
    console.log('🔄 Loading mock players data...');
    return mockPlayersData;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mockPlayersData, loadMockPlayers };
} 