interface CourseItemType {
  id: number;
  value: string;
}
const courseArray: CourseItemType[] = [
  { id: 0, value: "Basic Computer" },
  { id: 1, value: "Tally" },
  { id: 2, value: "Digital marketing" },
  { id: 3, value: "Web Designing" },
  { id: 4, value: "Advance Excel" },
  { id: 5, value: "Graphic Designing" },
  { id: 6, value: "Communication skills & Personality Development" },
  { id: 7, value: "Programming in C" },
  { id: 8, value: "Programming in JAVA" },
  { id: 9, value: "Computer Hardware" },
  { id: 10, value: "Office Assistant" },
  { id: 11, value: "Nursery Teachers Training" },
];

export function findCourseFromArray(id: number) {
  let value: string = "";
  courseArray.forEach((item) => {
    console.log(item, id, item.id === id);
    if (item.id === id) {
      value = item.value;
    }
  });
  return value;
}

export default courseArray;
