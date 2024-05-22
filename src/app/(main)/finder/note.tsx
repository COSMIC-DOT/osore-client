function Note({ note }: { note: any }) {
  return (
    <div className="after: h-[315px] w-[435px] rounded-3xl border-[1px] border-black p-[15px]">
      <div>{note.title}</div>
      <div>{note.repository}</div>
      <div>{note.description}</div>
      <div>contributors: {note.contributors}</div>
      <div>used by: {note.usedBy}</div>
      <div>stars: {note.stars}</div>
      <div>forks: {note.forks}</div>
    </div>
  );
}

export default Note;
