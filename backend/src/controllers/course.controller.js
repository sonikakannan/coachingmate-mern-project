import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'
import Course from "../models/course.model.js";

dotenv.config()

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


export const generateTopics = async (req, res) => {
  const { heading, level } = req.body;

  if (!heading || !level) {
    return res.status(400).json({ error: "Heading and level are required" });
  }

  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          parts: [
            {
              text: `Generate a detailed As your are coaching teacher
  - User wants to learn about the topic
  - Generate 5-7 Course titles for study (Short)
  - Make sure it is related to ${heading} and ${level}
  - Output should be an ARRAY of String in JSON FORMAT only
  - Do not add any plain text in output.`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048
      }
    });

    const resl= result.text
    res.json({ resl }); // you may need to extract text like this
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: "Failed to generate content" });
  }
};

export const generateCourse = async (req, res) => {
  const { topics, userId } = req.body;

  try {
    
  if (!topics) {
    return res.status(400).json({ error: "topics are required" });
  }
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          parts: [
            {
              text: `As you are coaching teacher
    - User want to learn about this ${topics}
    - Create 1 Courses With Course Name, Description, and 5/8 Chapters in each course
    - Make sure to add chapters 
    - List Content in each chapter along with Description in 5 to 8 lines
    - Do not Just Explain what chapter about, Explain in Detail with Example   
   - Explain the chapter content as detailed tutorial with list of content
    - Generate 10 Quizz, 10 Flashcard and 10 Questions answer
    - Tag each course to one of the categorty from :["Tech & Coding","Business & Finance","Health & Fitness","Science & Engineering","Arts & Creativity"]
    - Output in JSON Format only 
    -  "courses": [
  {
    "courseTitle": '<Intro to Python>',
    "description": '',
    "banner_image": "/banner1.png",
    "category":"",
    "chapters": [
      {
        chapterName: '',
        content: [
          {
            topic: '<Topic Name in 2 to 4 worlds ex.(Creating Variables)>'
            explain: '< Detailed Explaination in 5 to 8 Lines if required>',
            code: '<Code example of required else null',
            example: '< example of required else null'
          },
          
            ...
          
        ]
      }
    ],
    quiz:[
      {
        question:'',
        options:['a',b,c,d],
        correctAns:''
      }
    ],
    flashcards:[
      {
        front:'',
        back:''
      }
    ],
    qa:[
      {
        question:'',
        answer:''
      }
    ]
  }
]
    `
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048
      }
    });

    const rawText = result.text;
    const jsonText = rawText.match(/```json\n([\s\S]+?)\n```/);
    const parsed = jsonText ? JSON.parse(jsonText[1]) : JSON.parse(rawText);

    const newCourse = new Course({
      ...parsed.courses[0],
      user: userId,
      topics,
      createdAt: new Date(),
    });
    
    await newCourse.save();

    res.status(201).json({ message: "Course saved", course: newCourse });

  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: "Failed to generate content" });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find(); 
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching course details:", error.message);
    res.status(500).json({ error: "Failed to retrieve course details" });
  }
};
export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error.message);
    res.status(500).json({ error: "Failed to fetch course" });
  }
};

export const getUserCourses = async (req, res) => {
  const { userId } = req.params;
  try {
    const courses = await Course.find({ user: userId }); // filter by user
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching user courses:", error.message);
    res.status(500).json({ error: "Failed to retrieve user courses" });
  }
};
