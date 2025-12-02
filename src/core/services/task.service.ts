import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task.models';
import { Auth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private userId = this.auth.currentUser?.uid;

  private getTasksCollection() {
    return collection(this.firestore, 'tasks');
  }

  getTasks(): Observable<Task[]> {
    if (!this.userId)
      return new Observable<Task[]>((subscriber) => subscriber.next([]));

    const q = query(
      this.getTasksCollection(),
      where('userId', '==', this.userId)
    );
    return collectionData(q, { idField: 'id' }) as Observable<Task[]>;
  }

  addTask(task: Omit<Task, 'id' | 'createdAt' | 'userId'>) {
    return addDoc(this.getTasksCollection(), {
      ...task,
      userId: this.userId,
      createdAt: new Date(),
    });
  }

  updateTask(id: string, changes: Partial<Task>) {
    const taskDoc = doc(this.firestore, 'tasks', id);
    return updateDoc(taskDoc, changes);
  }

  deleteTask(id: string) {
    const taskDoc = doc(this.firestore, 'tasks', id);
    return deleteDoc(taskDoc);
  }
}
