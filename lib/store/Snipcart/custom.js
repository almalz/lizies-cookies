export const __html = `<address-fields section="top">
  <div class="snipcart-form__field">
    <snipcart-label class="snipcart-form__label" for="phone">
      Téléphone
    </snipcart-label>
    <snipcart-input name="phone" required></snipcart-input>
  </div>
</address-fields>
<billing section="bottom">
  <fieldset class="snipcart-form__set">
    <div class="snipcart-form__field">
      <snipcart-label class="snipcart__font--tiny" for="comment">
        Commentaire
      </snipcart-label>
      <snipcart-input name="comment"></snipcart-input>
    </div>
  </fieldset>
</billing>
<payment section="top">
  <div>
    <p>
      <snipcart-checkbox name="privacy-policy" required></snipcart-checkbox>
      <snipcart-label for="privacy-policy">
        J&#39;ai lu et j&#39;accepte les conditions générales de vente&nbsp;
        <a href="/terms" class="cgv-link"> CGV </a>
      </snipcart-label>
    </p>
  </div>
</payment>`
