import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearchChange: (searchQuery: string) => void;
}

export default function SearchBox({ value, onSearchChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={event => {
        onSearchChange(event.target.value);
      }}
    />
  );
}
