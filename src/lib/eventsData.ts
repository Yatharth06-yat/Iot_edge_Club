export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  longDescription?: string;
  category: "Upcoming" | "Previous";
  image: string;
  link?: string;
};

export const eventsData: Event[] = [
  // Upcoming
  {
    id: "coding-competition",
    title: "Edge Coding Competition",
    date: "May 15, 2026",
    time: "10:00 AM",
    location: "Computer Lab 1",
    description: "Show off your algorithmic and logic skills in our high-stakes IoT & embedded systems coding competition.",
    longDescription: "Get ready to battle it out in the ultimate Edge Coding Competition! 💻 This high-stakes coding sprint will test your logic, algorithmic problem-solving, and hardware integration skills. Compete solo or form a team of up to three to tackle intense challenges on HackerRank, write C++ code to interface with mystery sensors, and architect real-time IoT pipelines from scratch. ✨ Amazing prizes and bragging rights await the champions!",
    category: "Upcoming",
    image: "bg-[url('/assets/gallery/IMG_6497.jpg')]" // using a gallery image for fallback
  },

  // Previous
  {
    id: "secrets-of-hogwarts",
    title: "Secrets of Hogwarts",
    date: "April 4, 2026",
    time: "11:00 AM",
    location: "Campus Hall",
    description: "A magical treasure hunt experience.",
    longDescription: "🧙‍♂️ Dive into the magical world of Hogwarts with the IoT Edge Club! 'Secrets of Hogwarts' is a thrilling three-level event where you decode magical scrolls, guide a blindfolded teammate through challenges, and hunt for hidden treasures within the college. \n\n💫 Solve puzzles, unlock secrets, and compete in teams for fun and prizes! Join us on 4th April 2026 at 11 AM and experience an unforgettable journey full of mystery, magic, and adventure. ✨",
    category: "Previous",
    image: "bg-[url('/assets/past-img/IMG_6496.jpg')]"
  }
];