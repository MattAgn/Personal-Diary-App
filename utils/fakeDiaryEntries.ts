import { DiaryEntry } from "@/domain/DiaryEntry";

export const fakeDiaryEntries: DiaryEntry[] = [
  {
    id: "1",
    title: "They took my lunch again",
    content:
      "I don't want to go to school anymore. Mark and his friends cornered me at lunch today and took my sandwich. I told them I was hungry but they just laughed. I spent lunch period in the library again, trying to not cry. I wish I was stronger or bigger, or that they would just leave me alone. Mom asked why I was so hungry after school but I couldn't tell her.",
    createdAt: new Date("2024-02-15T12:30:00"),
  },
  {
    id: "2",
    title: "Made a friend in art class",
    content:
      "Something good happened today! There's a new kid named Alex in art class. When Mark started making fun of my drawing, Alex actually stood up for me and said he thought it was really good. We ended up sitting together and talking about manga. He likes One Piece too! For the first time in forever, I didn't feel completely alone at school.",
    createdAt: new Date("2024-02-20T15:45:00"),
  },
  {
    id: "3",
    title: "Bad day on the bus",
    content:
      "They threw my backpack around on the bus ride home. All my books fell out and my science project got crumpled. Ms. Johnson won't believe me if I tell her what happened. I can hear them laughing about it even now. I pretended to be asleep but I could feel everyone staring. I hate taking the bus. I hate school. I hate everything.",
    createdAt: new Date("2024-02-25T16:20:00"),
  },
  {
    id: "4",
    title: "Finally told Mom",
    content:
      "I broke down and told Mom everything today. About the lunches, the bus, everything. She cried a little which made me feel awful, but she hugged me for a long time. She's going to talk to the principal tomorrow. I'm scared it will make things worse, but I also feel lighter somehow, like I'm not carrying this huge secret anymore.",
    createdAt: new Date("2024-03-01T20:15:00"),
  },
  {
    id: "5",
    title: "Things might be getting better",
    content:
      "The principal had a meeting with Mark's parents. He had to apologize to me, and even though I know he didn't mean it, he's been leaving me alone. Alex and I started eating lunch together in the cafeteria instead of me hiding in the library. He's teaching me how to draw manga characters. Maybe things won't always be this bad.",
    createdAt: new Date("2024-03-05T19:30:00"),
  },
];
