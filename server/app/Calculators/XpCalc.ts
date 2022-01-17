import Database from "@ioc:Adonis/Lucid/Database";

/**
 * This class handles all xp calculations for ALL skills.
 * Since all xp is handled about the same way (except for jewelcrafting) it's easy to
 * put everything in the same file without encapsulating each action.
 */
class XPCalc {
    public masterylevel;


    constructor () {
        // this.masterylevel = Database.query()
        // .from('levels').select('level_mastery').where('')
    }

}








// export default new XpCalc();