import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase-setup";
import { ReminderType } from "../../types/DataModels";

export const getUserReminders = async (userId: string): Promise<ReminderType[]> => {
  try {
    const remindersRef = collection(db, "anaReminders");
    const q = query(remindersRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    const reminders: ReminderType[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        title: data.title || "Sin título",
        description: data.description || "",
        status: data.status || "pending",
      };
    });

    return reminders;
  } catch (error) {
    console.error("Error al obtener recordatorios:", error);
    return [];
  }
};

export const createReminder = async (
  reminder: Omit<ReminderType, "id">
): Promise<string | null> => {
  try {
    const remindersRef = collection(db, "anaReminders");
    const docRef = await addDoc(remindersRef, {
      ...reminder,
      createdAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error al crear recordatorio:", error);
    return null;
  }
};

export const modifyReminder = async (
  reminderId: string,
  updates: Partial<ReminderType>
): Promise<boolean> => {
  try {
    const reminderRef = doc(db, "anaReminders", reminderId);
    await updateDoc(reminderRef, updates);
    return true;
  } catch (error) {
    console.error("Error al modificar recordatorio:", error);
    return false;
  }
};

export const removeReminder = async (reminderId: string): Promise<boolean> => {
  try {
    const reminderRef = doc(db, "anaReminders", reminderId);
    await deleteDoc(reminderRef);
    return true;
  } catch (error) {
    console.error("Error al eliminar recordatorio:", error);
    return false;
  }
};