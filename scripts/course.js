const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

/*
  Keep the official course array above this code.
  Set completed: true only for courses you have completed.
*/

const courseList = document.querySelector("#course-list");
const totalCredits = document.querySelector("#total-credits");
const courseCount = document.querySelector("#course-count");

const allButton = document.querySelector("#all-courses");
const wddButton = document.querySelector("#wdd-courses");
const cseButton = document.querySelector("#cse-courses");

let currentFilter = "ALL";

function displayCourses(courseArray) {
    courseList.innerHTML = "";

    courseArray.forEach((course) => {
        const card = document.createElement("article");
        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        const heading = document.createElement("h3");
        heading.textContent = `${course.subject} ${course.number}`;

        const title = document.createElement("p");
        title.textContent = course.title;

        const credits = document.createElement("p");
        credits.textContent = `Credits: ${course.credits}`;

        card.append(heading, title, credits);
        courseList.appendChild(card);
    });

    const creditTotal = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCredits.textContent = `Total Credits: ${creditTotal}`;
    courseCount.textContent =
        `Showing ${courseArray.length} course(s)`;
}

function filterCourses(subject) {
    currentFilter = subject;

    let filteredCourses;

    if (subject === "ALL") {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(
            (course) => course.subject === subject
        );
    }

    allButton.setAttribute("aria-pressed", String(subject === "ALL"));
    wddButton.setAttribute("aria-pressed", String(subject === "WDD"));
    cseButton.setAttribute("aria-pressed", String(subject === "CSE"));

    displayCourses(filteredCourses);
}

allButton.addEventListener("click", () => filterCourses("ALL"));
wddButton.addEventListener("click", () => filterCourses("WDD"));
cseButton.addEventListener("click", () => filterCourses("CSE"));

filterCourses(currentFilter);
