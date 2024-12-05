import { isAvailableAsync, shareAsync } from "expo-sharing";
import { Alert } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";

import type { DiaryEntry } from "@/domain/DiaryEntry";

export function generateDiaryEntriesHtml(diaryEntries: DiaryEntry[]): string {
  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { font-size: 24px; }
          h2 { font-size: 20px; margin-top: 20px; }
          p { font-size: 16px; }
          .entry { margin-bottom: 40px; }
          .labels { font-size: 14px; color: gray; }
        </style>
      </head>
      <body>
        <h1>My Diary Entries</h1>
        ${diaryEntries
          .map(
            (entry) => `
          <div class="entry">
            <h2>${entry.title}</h2>
            <p class="labels">Labels: ${entry.labels.join(", ")}</p>
            <p>${entry.content}</p>
            <p>${entry.createdAt.toLocaleDateString()}</p>
          </div>
        `,
          )
          .join("")}
      </body>
    </html>
  `;
}

export const shareDiaryEntriesPdf = async (diaryEntries: DiaryEntry[]) => {
  try {
    const html = generateDiaryEntriesHtml(diaryEntries);
    const options = {
      html,
      fileName: "diary",
    };

    const file = await RNHTMLtoPDF.convert(options);

    if (!file.filePath) {
      throw new Error("Failed to generate PDF file, filePath is not defined");
    }
    if (!(await isAvailableAsync())) {
      throw new Error("Sharing is not available");
    }

    await shareAsync(`file://${file.filePath}`, {
      UTI: ".pdf",
      mimeType: "application/pdf",
    });
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Failed to share diary entries");
  }
};
