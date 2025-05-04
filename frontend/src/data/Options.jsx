import quizImage from '../assets/images/quizz.png';
import quizIcon from '../assets/images/quiz.png';
import flashcardImage from '../assets/images/flashcard.png';
import flashcardIcon from '../assets/images/layers.png';
import notesImage from '../assets/images/notes.png';
import qaIcon from '../assets/images/qa.png';

import banner1 from '../assets/images/banner1.png';
import banner2 from '../assets/images/banner2.png';
import banner3 from '../assets/images/banner3.png';
import banner4 from '../assets/images/banner4.png';
import banner5 from '../assets/images/banner5.png';

export const PracticeOption = [
    {
        name: 'Quiz',
        image: quizImage,
        icon: quizIcon,
        path: '/quiz'
    },
    {
        name: 'Flashcards',
        image: flashcardImage,
        icon: flashcardIcon,
        path: '/flashcards'
    },
    {
        name: 'Question & Ans',
        image: notesImage,
        icon: qaIcon,
        path: '/questionAnswer'
    }
];

export const imageAssets = {
    '/banner1.png': banner1,
    '/banner2.png': banner2,
    '/banner3.png': banner3,
    '/banner4.png': banner4,
    '/banner5.png': banner5,
};

export const CourseCategory = ["Tech & Coding", "Business & Finance", "Health & Fitness", "Science & Engineering", "Arts & Creativity"];

export const ProfileMenu = [
    {
        name: 'Add Course',
        icon: 'add-outline', // Ionic Icons
        path: '/addCourse'
    },
    {
        name: 'My Course',
        icon: 'book', // Ionic Icons
        path: '/(tabs)/home'
    },
    {
        name: 'Course Progress',
        icon: 'analytics-outline', // Ionic Icons
        path: '/(tabs)/progress'
    },
    {
        name: 'My Subscription',
        icon: 'shield-checkmark', // Ionic Icons
        path: ''
    },
    {
        name: 'Logout',
        icon: 'log-out', // Ionic Icons
        path: '/login'
    }
];