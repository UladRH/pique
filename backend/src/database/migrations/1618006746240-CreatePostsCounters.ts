import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePostsLikesCount1618006746240 implements MigrationInterface {
  private readonly table = new Table({
    name: 'posts_counters',
    columns: [
      { name: 'post_id', type: 'integer', isPrimary: true },
      { name: 'likes', type: 'integer', default: 0 },
    ],
  });

  private readonly foreignKeys = [
    new TableForeignKey({
      name: 'posts_counters_posts_id_fk',
      columnNames: ['post_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'posts',
      onDelete: 'CASCADE',
    }),
  ];

  private readonly indices = [];

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
