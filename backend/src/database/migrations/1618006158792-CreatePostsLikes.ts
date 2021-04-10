import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreatePostsLikes1618006158792 implements MigrationInterface {
  private readonly table = new Table({
    name: 'posts_likes',
    columns: [
      { name: 'post_id', type: 'integer', isPrimary: true },
      { name: 'profile_id', type: 'integer', isPrimary: true },
      { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
    ],
  });

  private readonly foreignKeys = [
    new TableForeignKey({
      name: 'posts_likes_profiles_id_fk',
      columnNames: ['profile_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'profiles',
    }),
    new TableForeignKey({
      name: 'posts_likes_posts_id_fk',
      columnNames: ['post_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'posts',
    }),
  ];

  private readonly indices = [
    new TableIndex({
      name: 'posts_likes_profile_id_index',
      columnNames: ['profile_id'],
    }),
  ];

  public async up(q: QueryRunner): Promise<void> {
    await q.createTable(this.table);
    await q.createForeignKeys(this.table, this.foreignKeys);
    await q.createIndices(this.table, this.indices);
  }

  public async down(q: QueryRunner): Promise<void> {
    await q.dropIndices(this.table, this.indices);
    await q.dropForeignKeys(this.table, this.foreignKeys);
    await q.dropTable(this.table);
  }
}
