export class RegexpUtils {
  // Basic Latin case-insensitive (A-Z a-z), numbers (0-9) and underscores (_)
  static readonly WORD = /^[\w]+$/;

  // Basic Latin case-insensitive (A-Z a-z), numbers (0-9), underscores (_) and dots (.)
  static readonly WORD_DOT = /^[\w.]+$/;

  static readonly DOT_APPEAR_CONSECUTIVELY = /^(.*\.\.)/;

  static readonly SCREEN_NAME = /^(?!.*\.\.)(?!.*\.$)([^\W][\w.]+$)/;
}
