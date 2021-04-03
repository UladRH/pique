import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreatePosts1616868446280 implements MigrationInterface {
  private readonly table = new Table({
    name: 'posts',
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
      { name: 'content', type: 'varchar', isNullable: true },
    ],
  });

  private readonly foreignKeys = [
    new TableForeignKey({
      name: 'posts_profiles_id_fk',
      columnNames: ['profile_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'profiles',
    }),
  ];

  private readonly indices = [
    new TableIndex({
      name: 'posts_profile_id_index',
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
