import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    selectedLevel: '',
    selectedTopics: [],
    courseData: null,
    topics: [],
  },
  reducers: {
    setLevel: (state, action) => {
      state.selectedLevel = action.payload;
    },
    toggleTopic: (state, action) => {
      const topic = action.payload;
      if (state.selectedTopics.includes(topic)) {
        state.selectedTopics = state.selectedTopics.filter(t => t !== topic);
      } else {
        state.selectedTopics.push(topic);
      }
    },
    setCourseData: (state, action) => {
      state.courseData = action.payload;
    },
    resetCourse: (state) => {
      state.selectedTopics = [];
      state.courseData = null;
    },
    setTopics: (state, action) => {
      state.topics = action.payload;
    }
  }
});

export const {
  setLevel,
  toggleTopic,
  setCourseData,
  resetCourse,
  setTopics
} = courseSlice.actions;

export default courseSlice.reducer;
