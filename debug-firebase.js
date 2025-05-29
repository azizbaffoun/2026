// Firebase Debug Script - Run this in browser console
console.log('🔧 Firebase Debug Script Starting...');

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCp8lAoWk02iuAUGSn3E30RA9uj-5Tos5E",
    authDomain: "vsport-e86e0.firebaseapp.com",
    databaseURL: "https://vsport-e86e0-default-rtdb.firebaseio.com",
    projectId: "vsport-e86e0",
    storageBucket: "vsport-e86e0.appspot.com",
    messagingSenderId: "531520967244",
    appId: "1:531520967244:web:b4c86af4a22e67f0d59ae9",
    measurementId: "G-85BSNTP37S"
};

async function debugFirebase() {
    try {
        console.log('🚀 Initializing Firebase...');
        
        // Check if Firebase is already initialized
        let app;
        try {
            app = firebase.app();
            console.log('✅ Firebase already initialized');
        } catch (error) {
            app = firebase.initializeApp(firebaseConfig);
            console.log('✅ Firebase initialized successfully');
        }
        
        const db = firebase.firestore();
        console.log('✅ Firestore connected');
        
        // Test different collection names
        const collectionsToTest = [
            'players', 'Players', 'PLAYERS',
            'team', 'Team', 'TEAM',
            'members', 'Members', 'MEMBERS',
            'users', 'Users', 'USERS',
            'athlete', 'athletes', 'Athletes',
            'player', 'Player', 'PLAYER'
        ];
        
        console.log('🔍 Testing collection names...');
        
        for (const collectionName of collectionsToTest) {
            try {
                console.log(`📂 Testing: ${collectionName}`);
                const snapshot = await db.collection(collectionName).get();
                
                if (snapshot.empty) {
                    console.log(`⚪ ${collectionName}: Empty`);
                } else {
                    console.log(`✅ ${collectionName}: Found ${snapshot.size} documents`);
                    
                    // Show first document structure
                    const firstDoc = snapshot.docs[0];
                    console.log(`📄 Sample document from ${collectionName}:`, firstDoc.data());
                    
                    // Show all documents
                    snapshot.forEach((doc, index) => {
                        console.log(`📄 Document ${index + 1} (ID: ${doc.id}):`, doc.data());
                    });
                    
                    return { collectionName, data: snapshot.docs.map(doc => doc.data()) };
                }
            } catch (error) {
                console.log(`❌ ${collectionName}: Error - ${error.message}`);
            }
        }
        
        console.log('⚠️ No collections found with data');
        
        // Try to list all collections (might not work due to security rules)
        try {
            console.log('🔍 Attempting to list all collections...');
            const collections = await db.listCollections();
            console.log('📚 Available collections:', collections.map(c => c.id));
        } catch (error) {
            console.log('⚠️ Cannot list collections:', error.message);
        }
        
        return null;
        
    } catch (error) {
        console.error('❌ Firebase debug failed:', error);
        return null;
    }
}

// Run the debug
debugFirebase().then(result => {
    if (result) {
        console.log('🎉 Found data in collection:', result.collectionName);
        console.log('📊 Data:', result.data);
    } else {
        console.log('❌ No player data found in any collection');
        console.log('💡 Possible solutions:');
        console.log('1. Check Firebase console to see actual collection names');
        console.log('2. Verify Firebase security rules allow read access');
        console.log('3. Make sure data exists in Firestore (not Realtime Database)');
        console.log('4. Check if you need authentication to access the data');
    }
});

// Export for manual testing
window.debugFirebase = debugFirebase; 