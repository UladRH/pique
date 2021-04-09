import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateMediaAttachments1617990219951 implements MigrationInterface {
  private readonly table = new Table({
    name: 'media_attachments',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
      { name: 'updated_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
      { name: 'profile_id', type: 'integer' },
      { name: 'post_id', type: 'integer', isNullable: true },
      { name: 'file_uri', type: 'varchar' },
    ],
  });

  private readonly foreignKeys = [
    new TableForeignKey({
      name: 'media_attachments_profiles_id_fk',
      columnNames: ['profile_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'profiles',
    }),
    new TableForeignKey({
      name: 'media_attachments_posts_id_fk',
      columnNames: ['post_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'posts',
    }),
  ];

  private readonly indices = [
    new TableIndex({
      name: 'media_attachments_post_id_index',
      columnNames: ['post_id'],
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
