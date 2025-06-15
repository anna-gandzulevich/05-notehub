import css from './NoteList.module.css';
import type { Note } from '../../types/note';
import { deleteNote } from '../../services/noteService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: () => {
      toast.error('Something went wrong, please, try again.');
    },
  });

  if (!notes || notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map((note: Note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => {
                if (note.id !== undefined) {
                  mutate(note.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
