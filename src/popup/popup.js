function getCompletedPercentage(course) {
    const { watchedDuration, totalDuration } = course;
    if (
        !totalDuration ||
        (totalDuration.hours === 0 &&
            totalDuration.minutes === 0 &&
            totalDuration.seconds === 0)
    ) {
        return 0;
    }
    const watchedSeconds =
        watchedDuration.hours * 3600 +
        watchedDuration.minutes * 60 +
        watchedDuration.seconds;
    const totalSeconds =
        totalDuration.hours * 3600 +
        totalDuration.minutes * 60 +
        totalDuration.seconds;
    return Math.round((watchedSeconds / totalSeconds) * 100);
}

function updateCoursesCount() {
    const inProgressEl = document.querySelector(".in-progress-course-count");
    const completedEl = document.querySelector(".completed-course-count");
    if (inProgressEl) inProgressEl.textContent = inProgressCoursesCount;
    if (completedEl) completedEl.textContent = completedCoursesCount;
}

const NO_COURSES_IN_PROGRESS = "All caught up! Time to find your next course.";
const NO_COURSES_COMPLETED =
    "Keep up the great work! Can't wait to see your first completed course here.";

function createNoCourseElement(message) {
    const noCourseDiv = document.createElement("div");
    noCourseDiv.className = "no-course-message";
    noCourseDiv.textContent = message;
    return noCourseDiv;
}

document.addEventListener("DOMContentLoaded", async () => {
    await renderCourses();
    addClickListeners();
    document.getElementById("export-btn").addEventListener("click", exportCourses);
});

let inProgressCoursesCount = 0;
let completedCoursesCount = 0;

async function renderCourses() {
    inProgressCoursesCount = 0;
    completedCoursesCount = 0;

    const inProgressCoursesEl = document.querySelector(".in-progress-courses");
    const completedCoursesEl = document.querySelector(".completed-courses");

    const welcomeMessageEl = document.getElementById("welcome-message");
    const courseListsContainerEl = document.getElementById(
        "course-lists-container"
    );

    inProgressCoursesEl.innerHTML = "";
    completedCoursesEl.innerHTML = "";

    const courses = await chrome.storage.local.get(null);
    const courseValues = Object.values(courses);

    // If there are no courses, show the welcome message and hide the lists
    if (courseValues.length === 0) {
        welcomeMessageEl.classList.remove("hidden");
        courseListsContainerEl.classList.add("hidden");
        updateCoursesCount();
        return;
    }

    // If courses exist, show the lists and hide the welcome message
    welcomeMessageEl.classList.add("hidden");
    courseListsContainerEl.classList.remove("hidden");

    for (const courseId in courses) {
        const course = courses[courseId];
        const completedPercentage = getCompletedPercentage(course);
        const courseElement = document.createElement("div");
        courseElement.className = "course";
        courseElement.dataset.courseId = courseId;
        courseElement.innerHTML = `
            <div class="course-content">
                <div class="course-img">
                    <img src="${course.courseImgSrc}" alt="Course Image">
                </div>
                <div class="course-info">
                    <h3>${course.courseName}</h3>
                    <p class="completion">${completedPercentage}% completed</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${completedPercentage}%;"></div>
                    </div>
                </div>
            </div>
            <div class="course-actions">
                <button class="reset-btn" title="Reset Progress">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 3v5h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 16H3v5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="mark-all-btn" title="Mark All as Watched">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M8.5 12.5L11 15l5-5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="delete-btn" title="Remove Course">
                    <svg width="16" height="16" viewBox="0 0 24 24"><path d="M6 7H12M18 7H12M12 7V7C12 7 12 7.58172 12 8.5C12 9.41828 12 10 12 10M12 7V7C12 7 12 6.41828 12 5.5C12 4.58172 12 4 12 4M10 11V17M14 11V17M5 7L6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19L19 7M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7H9V4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
            </div>
            <div class="delete-confirmation">
                <p> Are you sure you want to remove this course? </p>
                <div class="delete-confirmation-actions">
                    <button class="cancel-delete-btn">Cancel</button>
                    <button class="confirm-delete-btn">Remove Course</button>
                </div>
            </div>
        `;

        if (completedPercentage === 100) {
            completedCoursesCount++;
            completedCoursesEl.appendChild(courseElement);
        } else {
            inProgressCoursesCount++;
            inProgressCoursesEl.appendChild(courseElement);
        }
    }

    if (inProgressCoursesCount === 0) {
        inProgressCoursesEl.appendChild(
            createNoCourseElement(NO_COURSES_IN_PROGRESS)
        );
    }
    if (completedCoursesCount === 0) {
        completedCoursesEl.appendChild(
            createNoCourseElement(NO_COURSES_COMPLETED)
        );
    }
    updateCoursesCount();
}

function exportCourses() {
    chrome.storage.local.get(null, (courses) => {
        const dataStr = JSON.stringify(courses, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'vidlearn-pro-courses.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
}

function addClickListeners() {
    document.body.addEventListener("click", (e) => {
        const target = e.target;

        const summary = target.closest(".courses-summary");
        if (summary) {
            const coursesContainer = summary.nextElementSibling;
            const arrow = summary.querySelector("svg");
            if (coursesContainer) coursesContainer.classList.toggle("hide");
            if (arrow) arrow.classList.toggle("rotate");
            return;
        }

        const course = target.closest(".course");
        if (!course) return;

        if (target.closest(".reset-btn")) {
            const courseId = course.dataset.courseId;
            chrome.storage.local.get([courseId], (result) => {
                const courseData = result[courseId];
                if (courseData && courseData.videoWatchStatus) {
                    // Reset all videos to unwatched
                    Object.keys(courseData.videoWatchStatus).forEach(videoId => {
                        courseData.videoWatchStatus[videoId] = false;
                    });
                    // Reset watched duration
                    courseData.watchedDuration = { hours: 0, minutes: 0, seconds: 0 };
                    courseData.investedTime = { hours: 0, minutes: 0, seconds: 0 };
                    chrome.storage.local.set({ [courseId]: courseData }, () => {
                        renderCourses(); // Re-render to update UI
                    });
                }
            });
        } else if (target.closest(".mark-all-btn")) {
            const courseId = course.dataset.courseId;
            chrome.storage.local.get([courseId], (result) => {
                const courseData = result[courseId];
                if (courseData && courseData.videoWatchStatus) {
                    // Mark all videos as watched
                    Object.keys(courseData.videoWatchStatus).forEach(videoId => {
                        courseData.videoWatchStatus[videoId] = true;
                    });
                    // Update watched duration to total duration
                    courseData.watchedDuration = { ...courseData.totalDuration };
                    chrome.storage.local.set({ [courseId]: courseData }, () => {
                        renderCourses(); // Re-render to update UI
                    });
                }
            });
        } else if (target.closest(".delete-btn")) {
            course.classList.add("deleting");
        } else if (target.closest(".cancel-delete-btn")) {
            course.classList.remove("deleting");
        } else if (target.closest(".confirm-delete-btn")) {
            const isCompleted =
                course.parentElement.classList.contains("completed-courses");

            if (isCompleted) {
                completedCoursesCount--;
                if (completedCoursesCount === 0) {
                    document
                        .querySelector(".completed-courses")
                        .appendChild(
                            createNoCourseElement(NO_COURSES_COMPLETED)
                        );
                }
            } else {
                inProgressCoursesCount--;
                if (inProgressCoursesCount === 0) {
                    document
                        .querySelector(".in-progress-courses")
                        .appendChild(
                            createNoCourseElement(NO_COURSES_IN_PROGRESS)
                        );
                }
            }
            updateCoursesCount();

            chrome.storage.local.remove(course.dataset.courseId);
            course.classList.add("fading-out");
            course.addEventListener("transitionend", () => course.remove(), {
                once: true,
            });
        } else if (target.closest(".course-content")) {
            const course = target.closest(".course");
            if (!course) return;

            const courseId = course.dataset.courseId;
            if (!courseId) return;

            const playlistUrl = `https://www.youtube.com/playlist?list=${courseId}`;

            window.open(playlistUrl, "_blank", "noopener,noreferrer");
        }
    });
}
