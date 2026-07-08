import "./styles/audio-control.css";

/** Controle de BGM global — visível em todas as rotas. */
export default function AudioControl({ volume, muted, onToggleMute, onVolumeChange }) {
  return (
    <div className="audio-control" aria-label="audio controls">
      <button
        type="button"
        className="audio-control__toggle"
        onClick={onToggleMute}
        aria-label={muted ? "unmute background music" : "mute background music"}
        title={muted ? "Unmute" : "Mute"}
      >
        <span className="audio-control__icon">{muted ? "🔇" : "🔊"}</span>
        <span>{muted ? "MUTED" : "BGM"}</span>
      </button>
      <input
        className="audio-control__volume"
        type="range"
        min="0"
        max="100"
        step="1"
        value={Math.round(volume * 100)}
        onChange={(e) => onVolumeChange?.(Number(e.target.value) / 100)}
        aria-label="background music volume"
        title="Volume"
      />
    </div>
  );
}
