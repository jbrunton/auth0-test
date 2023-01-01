import { DbAdapter } from '../src/data/db.adapter';

export const run = async () => {
  try {
    const db = new DbAdapter();
    const { TableDescription } = await db.create();
    console.log(
      `Created table ${TableDescription?.TableName} (${TableDescription?.TableArn})`,
    );
  } catch (e) {
    console.error(e);
  }
};
run();
